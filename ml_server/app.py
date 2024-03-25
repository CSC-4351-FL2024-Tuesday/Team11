from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI
import os
client = OpenAI()


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

@app.route("/api/getAIResponse", methods=["GET", "POST"])
def getAIResponse():
    if request.method == "POST":
        try:
            data = request.get_json()
            food = data.get("foodNearMe", "")
            stores = data.get("storesNearMe", "")
            events = data.get("eventsNearMe", "")
            query = data.get("query", "")
            food_names = []
            store_names = []
            event_names = []
            for f in food:
                food_names.append(f['productName'])
            for f in stores:
                store_names.append(f['storeName'])
            for f in events:
                event_names.append(f['eventName'])

            res = getSortedOrder(food_names, store_names, event_names, query)
            import json
            json_response = json.dumps(res, indent=4)
            print(res)
            
            return jsonify({"status": "ok", "ai_response": json.loads(json_response)})

        except Exception as e:
            print("EXCPETION")
            print(e)
            return jsonify({"status": "error", "message": str(e)})


def getSortedOrder(food_names, store_names, event_names, query):
    print("Fetching GPT Response For Sorted Ordering")
    roles = []
    roles.append("system")
    system_message = f"You are a food / store / product reccomendation engine. You need to assign the following food / stores / products a priority based on the user query. You will receive a list of store names, food names and event names. Based on the users query, arrange them in the order of most similar to least similar.  The user query is {query}. The foods are {food_names}, the events are {event_names}, the stores are {store_names}. Your output should be of the following type: {{'food_names': ["", "", ""], 'event_names': ["", "", ""], 'store_names':["", "", ""]}}."
    completion_messages = [{"role": "system", "content": system_message}]
    response = client.chat.completions.create(model="gpt-3.5-turbo", messages=completion_messages)
    result = response.choices[0].message.content
    return result


def getSuggestion(food_names, store_names, event_names, query):
    print("Fetching GPT Response For Sorted Ordering")
    roles = []
    roles.append("system")
    system_message = f"You are a food / store / product reccomendation engine. Based on this query: {query} and these foods / stores / events, {food_names}, {store_names}, {event_names}, suggest to the user options to try and what they might like. Keep the response to 1 small paragraph, approximately 3-4 sentences, and keep it vibes/cool, bruh."
    completion_messages = [{"role": "system", "content": system_message}]
    response = client.chat.completions.create(model="gpt-3.5-turbo", messages=completion_messages)
    result = response.choices[0].message.content
    return result


@app.route("/api/getAddress", methods=["GET", "POST"])
def getAddress():
    if request.method == "POST":
        try:
            data = request.get_json()
            loc = data.get("address", "")
            import requests

            api_key = os.environ.get['REACT_APP_GOOGLE_MAPS_API_KEY']  # Replace 'YOUR_API_KEY_HERE' with your actual API key
            url = f'https://maps.googleapis.com/maps/api/geocode/json?address={loc}&key={api_key}'
            response = requests.get(url)


            resp_json_payload = response.json()
            print(resp_json_payload['results'][0]['geometry']['location'])
            return jsonify({"status": "ok", "ai_response": resp_json_payload['results'][0]['geometry']['location']})

        except Exception as e:
            print("EXCPETION")
            print(e)
            return jsonify({"status": "error", "message": str(e)})


if __name__ == "__main__":
    app.run(debug=True)
