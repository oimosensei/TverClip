package main

import (
	"fmt"
	"net/http"

	"golang.org/x/net/html"
)

// OGP情報を格納するための構造体
type OGPInfo struct {
	Image       string
	Description string
}

// OGPタグをHTMLから抽出する関数
func extractOGPInfo(url string) (*OGPInfo, error) {
	// http.Requestオブジェクトを作成
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	// User-Agentを設定
	req.Header.Set("User-Agent", "facebookexternalhit")

	// HTTPクライアントを作成
	client := &http.Client{}

	// HTTPリクエストを送信
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	// HTMLドキュメントをパース
	doc, err := html.Parse(resp.Body)
	if err != nil {
		return nil, err
	}

	// OGP情報を格納する変数を初期化
	ogp := OGPInfo{}

	// HTMLノードを再帰的に探索
	var f func(*html.Node)
	f = func(n *html.Node) {
		if n.Type == html.ElementNode && n.Data == "meta" {
			var property, content string
			for _, a := range n.Attr {
				if a.Key == "property" {
					property = a.Val
				} else if a.Key == "content" {
					content = a.Val
				}
			}
			switch property {
			case "og:image":
				ogp.Image = content
			case "og:description":
				ogp.Description = content
			}
			//プロパティと内容を出力
			if property != "" && content != "" {
				fmt.Printf("Property: %s, Content: %s\n", property, content)
			}
		}
		for c := n.FirstChild; c != nil; c = c.NextSibling {
			f(c)
		}
	}
	f(doc)

	return &ogp, nil
}

func main() {
	// テスト用のURL
	url := "https://tver.jp/episodes/epl3ocqr50"

	// OGP情報を取得
	ogpInfo, err := extractOGPInfo(url)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("OGP Image URL:", ogpInfo.Image)
	fmt.Println("OGP Description:", ogpInfo.Description)
}
