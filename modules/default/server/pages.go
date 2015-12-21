package server

import (
	"fmt"
	"html/template"
	"net/http"

	"github.com/julienschmidt/httprouter"
	"google.golang.org/appengine"
)

var (
	homeTmpl     = makeTmpl("home", false)
	graphiQLTmpl = template.Must(template.ParseFiles("templates/graphiql.tmpl"))
)

func makeTmpl(name string, static bool) *template.Template {
	return template.Must(template.ParseFiles(
		"templates/layout.tmpl",
		fmt.Sprintf("templates/%s.tmpl", name)))
}

func homeHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	var m = make(map[string]interface{})
	m["IsDev"] = appengine.IsDevAppServer()
	if err := homeTmpl.Execute(w, m); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func graphiQLHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	var m = make(map[string]interface{})
	if err := graphiQLTmpl.Execute(w, m); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
