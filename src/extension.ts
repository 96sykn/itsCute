import * as vscode from 'vscode';

// 拡張機能の実行部分
export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "It\'s Cute." is now active!');

    // コマンドの定義
    let disposable = vscode.commands.registerCommand('itscute.addComment', () => {
        // 現在のエディタを取得
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            // 現在編集中のテキストの言語モードを取得
            const languageId = editor.document.languageId;


            const config = vscode.workspace.getConfiguration('itsCute');
            const cuteText = config.get('cuteText', 'かに'); // デフォルトは「かに」
            const cuteEmoji = config.get('cuteEmoji', '🦀'); // デフォルトは「🦀」

            // 挿入するコメントの文字列
            const commentText = `








					作成中のプログラムに
					${cuteText} が出現しました

						₍₍⁽⁽${cuteEmoji}₎₎⁾⁾

					かわいいですね








`;

            // 言語によってコメントアウトのスタイルを決定
            let commentSymbol = '';

            switch (languageId) {
                case 'javascript':
                case 'typescript':
                case 'html':
                case 'css':
                    commentSymbol = '//'; // JavaScript、TypeScript、HTML、CSSなど
                    break;
                case 'python':
                    commentSymbol = '#'; // Python
                    break;
                case 'java':
                    commentSymbol = '//'; // Java
                    break;
                case 'ruby':
                    commentSymbol = '#'; // Ruby
                    break;
                default:
                    commentSymbol = '//'; // デフォルトは // を使用
                    break;
            }

            // コメントアウトされたテキストを挿入
            const commentedText = commentText.split('\n').map(line => `${commentSymbol} ${line}`).join('\n');

            // 現在のカーソル位置にテキストを挿入
            editor.edit(editBuilder => {
                const position = editor.selection.active;
                editBuilder.insert(position, commentedText);
            });
        }
    });

    // コマンドを実行するショートカットキーを設定
    context.subscriptions.push(disposable);

}

// 拡張機能が無効化されたときの処理
export function deactivate() {}
