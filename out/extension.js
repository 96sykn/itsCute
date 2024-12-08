"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
// 拡張機能の実行部分
function activate(context) {
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
function deactivate() { }
//# sourceMappingURL=extension.js.map