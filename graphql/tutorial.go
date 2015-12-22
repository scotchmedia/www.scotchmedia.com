package graphql

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"strings"

	"github.com/russross/blackfriday"
	"golang.org/x/net/context"
	"google.golang.org/appengine/log"
)

type Book struct {
	ID       string    `json:"id"`
	Title    string    `json:"title"`
	Chapters []Chapter `json:"chapters"`
}

type Chapter struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	Pages []Page `json:"pages"`
}

type Page struct {
	ID      string `json:"id"`
	Title   string `json:"title"`
	URL     string `json:"url"`
	Content string `json:"content"`
	Toc     Book   `json:"toc"`
}

func ExtractID(key string) (string, string, string, string) {
	s := strings.Split(key, "|")
	if len(s) == 2 {
		return s[0], s[1], s[2], s[3]
	}
	return "", "", "", ""
}

func GetPageByID(c context.Context, id string) *Page {
	category, book, chapter, page := ExtractID(id)
	return GetPage(c, category, book, chapter, page)
}

func GetPage(c context.Context, category, book, chapter, page string) *Page {
	var content string
	var toc Book
	id := fmt.Sprintf("%s|%s|%s|%s", category, book, chapter, page)
	url := fmt.Sprintf("/tutorials/%s/%s/%s/%s", category, book, chapter, page)
	pageLoc := fmt.Sprintf("md/tutorials/%s/%s/%s/%s.md", category, book, chapter, page)
	tocLoc := fmt.Sprintf("md/tutorials/%s/%s/toc.json", category, book)
	log.Infof(c, `/// pageLoc: %#v `, pageLoc)
	log.Infof(c, `/// tocLoc: %#v `, tocLoc)
	if category != "" {
		file, err := ioutil.ReadFile(pageLoc)
		if err == nil {
			log.Infof(c, `GetPage err: %s`, err)
			// url = "/" + pageID
			content = string(blackfriday.MarkdownCommon(file))
		}
		tocFile, err := ioutil.ReadFile(tocLoc)
		if err != nil {
			log.Infof(c, `GetPage tocFile err: %s`, err)
		} else {
			if err := json.Unmarshal(tocFile, &toc); err != nil {
				log.Infof(c, `GetPage tocFile unmarshal err: %s`, err)
			}
		}
		// log.Infof(c, `/// toc: %#v `, toc)
		// log.Infof(c, `/// toc: file %#v `, string(tocFile))
	}
	return &Page{
		ID:      id,
		URL:     url,
		Content: content,
		Toc:     toc,
	}
}
