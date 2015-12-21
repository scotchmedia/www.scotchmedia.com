package graphql

// Mock authenticated ID
const ViewerId = "me"

type Viewer struct {
	Id string `json:"id"`
}

// Mock data
var viewer = &Viewer{ViewerId}

func GetViewer() *Viewer {
	return viewer
}
