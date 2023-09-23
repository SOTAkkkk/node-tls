const https = require('node:https');
const {program} = require('commander');

program.option('-s, --serverUrl <url>', 'serverUrl for endpoint', 'https://example.com')
program.parse(process.argv);

// チェックするサーバーのURL
const serverUrl = program.opts().serverUrl;
console.log(serverUrl)
// HTTPSリクエストを作成
const req = https.request(serverUrl, (res) => {
    // サーバーに接続成功した場合

    // SSL証明書の詳細情報にアクセス
    const certificate = res.socket.getPeerCertificate();

    // 有効期限を取得
    console.log("証明書の有効期限: " + certificate.valid_to)
    console.log("認証局かどうか  : " + certificate.ca)
    console.log("証明書主体者    : " + certificate.subject.CN)
    console.log("証明書発行者    : " + certificate.issuer.CN)
    console.log("subjectaltname  : " + certificate.subjectaltname)

});

// リクエストのエラーハンドリング
req.on('error', (error) => {
    console.error('リクエストエラー:', error);
});

// リクエストを送信
req.end();
