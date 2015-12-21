package graphql

import (
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/relay"
	"google.golang.org/appengine/log"
)

var viewerType *graphql.Object
var pageType *graphql.Object
var nodeDefinitions *relay.NodeDefinitions

// Schema is the Title Farm Schema
var Schema graphql.Schema

func init() {

	nodeDefinitions = relay.NewNodeDefinitions(relay.NodeDefinitionsConfig{
		IDFetcher: func(id string, info graphql.ResolveInfo) interface{} {
			resolvedID := relay.FromGlobalID(id)
			_, c, _ := getReq(info.RootValue)
			log.Infof(c, `:: ID FETCHER - [%v] ::`, resolvedID)
			if resolvedID.Type == "Viewer" {
				return GetViewer()
			}
			if resolvedID.Type == "Page" {
				return GetPage(c, resolvedID.ID)
			}
			return nil
		},
		TypeResolve: func(value interface{}, info graphql.ResolveInfo) *graphql.Object {
			switch value.(type) {
			case *Viewer:
				return viewerType
			case *Page:
				return pageType
			default:
				return pageType
			}
		},
	})

	pageType = graphql.NewObject(graphql.ObjectConfig{
		Name: "Page",
		Fields: graphql.Fields{
			"id":      relay.GlobalIDField("Page", nil),
			"url":     &graphql.Field{Type: graphql.String},
			"content": &graphql.Field{Type: graphql.String},
		},
		Interfaces: []*graphql.Interface{nodeDefinitions.NodeInterface},
	})

	viewerType = graphql.NewObject(graphql.ObjectConfig{
		Name: "Viewer",
		Fields: graphql.Fields{
			"id": relay.GlobalIDField("Viewer", nil),
			"page": &graphql.Field{
				Type: pageType,
				Args: relay.NewConnectionArgs(graphql.FieldConfigArgument{
					"id": &graphql.ArgumentConfig{
						Type: graphql.String,
					},
				}),
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					_, c, _ := getReq(p.Info.RootValue)
					id, _ := p.Args["id"].(string)
					log.Infof(c, `:: QUERY - Page [%s] ::`, id)
					return GetPage(c, id), nil
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
