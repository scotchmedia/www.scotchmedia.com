package main

import (
	"net/http"
	"strings"

	"github.com/julienschmidt/httprouter"
	"google.golang.org/appengine"
	"google.golang.org/appengine/log"
	"scotchmedia.com/graphql"
)

func subdomainRedirect(h httprouter.Handle) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		//The Host that the user queried.
		host := r.URL.Host
		host = strings.TrimSpace(host)
		c := appengine.NewContext(r)
		// Figure out if a subdomain exists in the host given.
		hostParts := strings.Split(host, ".")
		if len(hostParts) > 2 {
			// A subdomain exists
			log.Infof(c, "Redirecting Subdomain: %s ...", hostParts[0])
			http.Redirect(w, r, siteDomain, 301)
			return
		}
		h(w, r, ps)
		return
	}
}

func init() {
	// GraphQL
	// ---------------------
	http.Handle("/graphql", graphql.NewGQLHandler())

	// GraphiQL Api Client
	r3 := httprouter.New()
	r3.RedirectTrailingSlash = false
	r3.RedirectFixedPath = false
	r3.GET("/graphiql", graphiQLHandler)
	http.Handle("/graphiql", r3)
	// ---------------------

	// Site
	r2 := httprouter.New()
	r2.RedirectTrailingSlash = false
	r2.RedirectFixedPath = false
	// r2.GET("/*path", subdomainRedirect(homeHandler))
	r2.GET("/*path", homeHandler)
	http.Handle("/", r2)
}
