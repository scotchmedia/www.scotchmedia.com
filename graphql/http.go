package graphql

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/gorilla/schema"
	"github.com/graphql-go/graphql"
)

const (
	ContentTypeJSON           = "application/json"
	ContentTypeGraphQL        = "application/graphql"
	ContentTypeFormURLEncoded = "application/x-www-form-urlencoded"
)

var decoder = schema.NewDecoder()

type Handler struct {
	Schema *graphql.Schema
	// render *render.Render
}

type requestOptions struct {
	Query         string                 `json:"query" url:"query" schema:"query"`
	Variables     map[string]interface{} `json:"variables" url:"variables" schema:"variables"`
	OperationName string                 `json:"operationName" url:"operationName" schema:"operationName"`
}

// a workaround for getting`variables` as a JSON string
type requestOptionsCompatibility struct {
	Query         string `json:"query" url:"query" schema:"query"`
	Variables     string `json:"variables" url:"variables" schema:"variables"`
	OperationName string `json:"operationName" url:"operationName" schema:"operationName"`
}

func getRequestOptions(r *http.Request) *requestOptions {

	query := r.URL.Query().Get("query")
	if query != "" {

		// get variables map
		var variables map[string]interface{}
		variablesStr := r.URL.Query().Get("variables")
		json.Unmarshal([]byte(variablesStr), variables)

		return &requestOptions{
			Query:         query,
			Variables:     variables,
			OperationName: r.URL.Query().Get("operationName"),
		}
	}
	if r.Method != "POST" {
		return &requestOptions{}
	}
	if r.Body == nil {
		return &requestOptions{}
	}

	// TODO: improve Content-Type handling
	contentTypeStr := r.Header.Get("Content-Type")
	contentTypeTokens := strings.Split(contentTypeStr, ";")
	contentType := contentTypeTokens[0]

	switch contentType {
	case ContentTypeGraphQL:
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			return &requestOptions{}
		}
		return &requestOptions{
			Query: string(body),
		}
	case ContentTypeFormURLEncoded:
		var opts requestOptions
		err := r.ParseForm()
		if err != nil {
			return &requestOptions{}
		}
		err = decoder.Decode(&opts, r.PostForm)
		if err != nil {
			return &requestOptions{}
		}
		return &opts
	case ContentTypeJSON:
		fallthrough
	default:
		var opts requestOptions
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			return &opts
		}
		err = json.Unmarshal(body, &opts)
		if err != nil {
			// Probably `variables` was sent as a string instead of an object.
			// So, we try to be polite and try to parse that as a JSON string
			var optsCompatible requestOptionsCompatibility
			json.Unmarshal(body, &optsCompatible)
			json.Unmarshal([]byte(optsCompatible.Variables), &opts.Variables)
		}
		return &opts
	}
}

// sendError returns an http error
func sendError(w http.ResponseWriter, r *http.Request, status int) {
	w.WriteHeader(status)
	if status == http.StatusInternalServerError {
		fmt.Fprint(w, "Server error")
	}
	if status == http.StatusNotFound {
		fmt.Fprint(w, "404")
	}
}

// sendJSON encodes a struct and send response as JSON
func sendJSON(w http.ResponseWriter, r *http.Request, status, x interface{}) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status.(int))
	if err := json.NewEncoder(w).Encode(x); err != nil {
		sendError(w, r, http.StatusInternalServerError)
	}
}

// ServeHTTP provides an entry point into executing graphQL queries
func (h *Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	// get query
	opts := getRequestOptions(r)

	// execute graphql query
	// var userID string
	// u, err := auth.CurrentUser(r)
	// if err == nil {
	// 	userID = u.ID
	// }
	// c := appengine.NewContext(r)
	// log.Infof(c, `User ID: %s `, userID)
	rootObj := map[string]interface{}{
		"userId": "",
		"req":    r,
	}
	params := graphql.Params{
		Schema:         *h.Schema,
		RequestString:  opts.Query,
		VariableValues: opts.Variables,
		OperationName:  opts.OperationName,
		RootObject:     rootObj,
	}
	result := graphql.Do(params)

	// render result
	// h.render.JSON(w, http.StatusOK, result)
	sendJSON(w, r, http.StatusOK, result)
}

func NewGQLHandler() *Handler {
	return &Handler{
		Schema: &Schema,
	}
}
