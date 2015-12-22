package graphql

import (
	"crypto/md5"
	"encoding/hex"
	"net/http"

	"golang.org/x/net/context"
	"google.golang.org/appengine"
)

type User struct {
	ID            string `json:"id"`
	Authenticated bool   `json:"authenticated"`
	DisplayName   string `json:"displayName"`
	JobTitle      string `json:"jobTitle"`
	Location      string `json:"location"`
	URL           string `json:"url"`
	Bio           string `json:"bio"`
	Email         string `json:"email"`
	PhotoURL      string `json:"photoUrl"`
}

func getReq(rootValue interface{}) (*http.Request, context.Context, *User) {
	rv, _ := rootValue.(map[string]interface{})
	r := rv["req"].(*http.Request)
	c := appengine.NewContext(r)
	var u *User
	userID := rv["userId"].(string)
	if userID != "" {
		u = &User{
			ID:            userID,
			Authenticated: true,
		}
	} else {
		u = &User{
			Authenticated: false,
		}
	}
	return r, c, u
}

func hash(str string) string {
	hasher := md5.New()
	hasher.Write([]byte(str))
	return hex.EncodeToString(hasher.Sum(nil))
}
