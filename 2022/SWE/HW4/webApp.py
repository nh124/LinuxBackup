import flask

app = flask.Flask(__name__)
Anime = ['Bleach', 'Erased', 'Arcane', 'Attack on Titan', 'Kuroko no Basket']
imagesOfAnime = [
    'https://musicart.xboxlive.com/7/32da1100-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080',
    'http://themarketactivity.com/wp-content/uploads/2021/06/erased.jpg',
    'https://i.ytimg.com/vi/4Ps6nV4wiCE/maxresdefault.jpg',
    'https://flxt.tmsimg.com/assets/p10701949_b_v8_ah.jpg',
    'https://static3.cbrimages.com/wordpress/wp-content/uploads/2021/01/Kurokos-Basketball-header.jpg?q=50&fit=crop&w=943&h=500&dpr=1.5'
]
@app.route('/')
def index():
    return flask.render_template(
        'index.html',
        len = len(Anime),
        Anime = Anime,
        imagesOfAnime = imagesOfAnime
    )

app.run(debug=True)
