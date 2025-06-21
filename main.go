package main

import (
	"encoding/json"
	"net/http"
)

type Response struct {
    Message string `json:"message"`
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(Response{Message: "Hello, API!"})
}

func main() {
    http.HandleFunc("/api/hello", helloHandler)
}