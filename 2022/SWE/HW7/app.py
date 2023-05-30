import flask 
import random

app = flask.Flask(__name__)

def FunFact(randomVal):
    FunFacts = [
        "Dark chocolate is good for you",
        "New car smell is the scent of dozens of chemicals.",
        "The world wastes about 1 billion metric tons of food each year.",
        "The world's smallest reptile was first reported in 2021.",
        "Many feet bones don't harden until you're an adult.",
        "Some sea snakes can breathe through their skin.",
        "The moon has moonquakes."
    ]
    return FunFacts[randomVal], len(FunFacts)

@app.route('/funFacts')
def funfacts():
    randomVal = random.randint(0, FunFact(0)[1])
    randFunFacts = FunFact(randomVal)[0]
    return flask.jsonify(randFunFacts)

if __name__ == "__main__":
    app.run()
