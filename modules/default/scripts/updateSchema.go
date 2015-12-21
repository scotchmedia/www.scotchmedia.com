package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"os"

	"github.com/graphql-go/graphql"
	"github.com/graphql-go/graphql/testutil"
	schema "scotchmedia.com/graphql"
)

func main() {
	// Save JSON of full schema introspection for Babel Relay Plugin to use
	result := graphql.Do(graphql.Params{
		Schema:        schema.Schema,
		RequestString: testutil.IntrospectionQuery,
	})
	if result.HasErrors() {
		log.Fatalf("ERROR introspecting schema: %v", result.Errors)
		return
	}
	b, err := json.MarshalIndent(result, "", "  ")
	if err != nil {
		log.Fatalf("ERROR: %v", err)
	}
	err = ioutil.WriteFile("../data/schema.json", b, os.ModePerm)
	if err != nil {
		log.Fatalf("ERROR: %v", err)
	}

	// TODO: Save user readable type system shorthand of schema
	// pending implementation of printSchema
	/*
		fs.writeFileSync(
		  path.join(__dirname, '../data/schema.graphql'),
		  printSchema(Schema)
		);
	*/
}
