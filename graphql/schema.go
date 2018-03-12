package graphql

import (
	"fmt"

	"github.com/graphql-go/graphql"
	"github.com/graphql-go/relay"
	"golang.org/x/net/context"
	"google.golang.org/appengine/log"
)

var viewerType *graphql.Object
var bookType *graphql.Object
var chapterType *graphql.Object
var pageType *graphql.Object
var nodeDefinitions *relay.NodeDefinitions

// Schema is the Title Farm Schema
var Schema graphql.Schema

func init() {

	nodeDefinitions = relay.NewNodeDefinitions(relay.NodeDefinitionsConfig{
		IDFetcher: func(id string, info graphql.ResolveInfo, ctx context.Context) (interface{}, error) {
			resolvedID := relay.FromGlobalID(id)
			_, c, _ := getReq(info.RootValue)
			log.Infof(c, `:: ID FETCHER - [%v] ::`, resolvedID)
			if resolvedID.Type == "Viewer" {
				return GetViewer(), nil
			}
			if resolvedID.Type == "Page" {
				return GetPageByID(c, resolvedID.ID), nil
			}
			return "", nil
		},
		TypeResolve: func(p graphql.ResolveTypeParams) *graphql.Object {
			switch p.Value.(type) {
			case *Viewer:
				return viewerType
			case *Page:
				return pageType
			default:
				return pageType
			}
		},
	})

	var idFetcher relay.GlobalIDFetcherFn
	idFetcher = func(obj interface{}, info graphql.ResolveInfo, ctx context.Context) (string, error) {
		switch obj := obj.(type) {
		case *Chapter:
			return fmt.Sprintf("c_%s", hash(obj.Title)), nil
		case *Book:
			return fmt.Sprintf("b_%s", hash(obj.Title)), nil
		case *Page:
			if obj.ID != "" {
				return fmt.Sprintf("p_%s", obj.ID), nil
			}
			return fmt.Sprintf("p_%s", hash(obj.URL)), nil
		}
		return fmt.Sprintf("%v", hash(fmt.Sprintf("%#v", obj))), nil
	}

	pageType = graphql.NewObject(graphql.ObjectConfig{
		Name: "Page",
		Fields: graphql.Fields{
			"id":      relay.GlobalIDField("Page", idFetcher),
			"title":   &graphql.Field{Type: graphql.String},
			"url":     &graphql.Field{Type: graphql.String},
			"content": &graphql.Field{Type: graphql.String},
		},
		Interfaces: []*graphql.Interface{nodeDefinitions.NodeInterface},
	})

	chapterType = graphql.NewObject(graphql.ObjectConfig{
		Name: "Chapter",
		Fields: graphql.Fields{
			"id":    relay.GlobalIDField("Chapter", idFetcher),
			"title": &graphql.Field{Type: graphql.String},
			"pages": &graphql.Field{Type: graphql.NewList(pageType)},
		},
		Interfaces: []*graphql.Interface{nodeDefinitions.NodeInterface},
	})

	bookType = graphql.NewObject(graphql.ObjectConfig{
		Name: "Book",
		Fields: graphql.Fields{
			"id":       relay.GlobalIDField("Book", idFetcher),
			"title":    &graphql.Field{Type: graphql.String},
			"chapters": &graphql.Field{Type: graphql.NewList(chapterType)},
		},
		Interfaces: []*graphql.Interface{nodeDefinitions.NodeInterface},
	})

	pageType.AddFieldConfig("toc", &graphql.Field{Type: bookType})

	viewerType = graphql.NewObject(graphql.ObjectConfig{
		Name: "Viewer",
		Fields: graphql.Fields{
			"id": relay.GlobalIDField("Viewer", nil),
			"page": &graphql.Field{
				Type: pageType,
				Args: relay.NewConnectionArgs(graphql.FieldConfigArgument{
					"category": &graphql.ArgumentConfig{Type: graphql.String},
					"book":     &graphql.ArgumentConfig{Type: graphql.String},
					"chapter":  &graphql.ArgumentConfig{Type: graphql.String},
					"page":     &graphql.ArgumentConfig{Type: graphql.String},
				}),
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					_, c, _ := getReq(p.Info.RootValue)
					category, _ := p.Args["category"].(string)
					book, _ := p.Args["book"].(string)
					chapter, _ := p.Args["chapter"].(string)
					page, _ := p.Args["page"].(string)
					log.Infof(c, `:: QUERY - Page [%s %s %s %s] ::`, category, book, chapter, page)
					return GetPage(c, category, book, chapter, page), nil
				},
			},
		},
		Interfaces: []*graphql.Interface{nodeDefinitions.NodeInterface},
	})

	rootType := graphql.NewObject(graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"viewer": &graphql.Field{
				Type: viewerType,
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					return GetViewer(), nil
				},
			},
			"node": nodeDefinitions.NodeField,
		},
	})

	// mutationType := graphql.NewObject(graphql.ObjectConfig{
	// 	Name:   "Mutation",
	// 	Fields: graphql.Fields{},
	// })

	var err error
	Schema, err = graphql.NewSchema(graphql.SchemaConfig{
		Query: rootType,
		// Mutation: mutationType,
	})
	if err != nil {
		panic(err)
	}
}
