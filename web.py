import redis

from flask import request
from flask import Flask
from flask import jsonify, render_template

app = Flask('game')
app.debug = True

redis = redis.StrictRedis('127.0.0.1', 6379, 0)

@app.route("/")
def index():
	return render_template('index.html')


@app.route("/color")
def game_color():
	return render_template('color.html')


@app.route("/finish.json", methods=['POST'])
def game_finish():
	step = request.form['step']
	if step > 0:
		redis.hincrby('color_ranks', step, 1)
	ranks = redis.hgetall('color_ranks')
	return jsonify(ranks)
