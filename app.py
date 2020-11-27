from flask import Flask, render_template, request, jsonify
from jsonrpcclient import request as rpc_request

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('about.html', page_name='Homepage')


@app.route('/api/search')
def api_search():
    text = request.args.get('q', '')
    response = rpc_request("http://127.0.0.1:5001", "process", text=text)
    result = response.data.result
    # result = [f'{element["word"]}: {element["is_loanword"]}'for element in result]
    return jsonify({'results': result})


@app.route('/search')
def search():
    q = request.args.get('q', '')
    return render_template('evaluate.html', page_name='Search', q=q, results=q)


if __name__ == '__main__':
    app.run(debug=True)
