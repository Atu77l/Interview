from flask import Flask, render_template, request, redirect, url_for, flash, jsonify,make_response
import json
from flask_cors import CORS


app = Flask(__name__, template_folder='templates')
CORS(app)


# sugar soap rice 
# quantity and price
shopping_list=[{"item":"sugar","quantity":20,"unitPrice":24},{"item":"soap","quantity":10,"unitPrice":30},
{"item":"rice","quantity":12,"unitPrice":35},{"item":"dal","quantity":1,"unitPrice":100},
{"item":"soap","quantity":100,"unitPrice":5}]


# api for list 
@app.route('/list', methods=['GET'])
def list_bucket():
    try:
        return jsonify({"status":"200","data": shopping_list}),200
    except Exception as e:
        error_message = str(e)
        return jsonify({"status":"500",'message': "Try Again Later"}), 500

if __name__ == '__main__':
    app.run(port=8002,debug=True)