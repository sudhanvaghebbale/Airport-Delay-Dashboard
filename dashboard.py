from flask import Flask, render_template
app = Flask(__name__)

@app.route('/weather')
def weather():
    return render_template('dynamic_dashboard.html')

@app.route('/airport')
def airport():
    return render_template('index.html')

@app.route('/maps')
def maps():
    return render_template('hello.html')

if __name__ == '__main__':
    app.run(debug=True)
