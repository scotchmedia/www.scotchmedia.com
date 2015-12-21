package graphql

import (
	"io/ioutil"

	"github.com/russross/blackfriday"
	"golang.org/x/net/context"
	"google.golang.org/appengine/log"
)

type Page struct {
	Id      string `json:"id"`
	URL     string `json:"url"`
	Content string `json:"content"`
}

func GetPage(c context.Context, pageID string) *Page {
	log.Infof(c, `/// pageID: %#v `, pageID)
	var url = ""
	var content = ""
	if pageID != "" {
		file, err := ioutil.ReadFile("md/tutorials/" + pageID + ".md")
		if err == nil {
			log.Infof(c, `GetPage err: %s`, err)
			url = "/" + pageID
			content = string(blackfriday.MarkdownCommon(file))
		}
	}
	return &Page{
		Id:      pageID,
		URL:     url,
		Content: content,
	}
}
