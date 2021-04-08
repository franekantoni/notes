import json
import time
from hashlib import sha256

import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('notes')

def lambda_handler(event, context):
    #load params
    body = json.loads(event['body'])
    #create note object
    note = {
        'text': body['text'],
        'pk': body['pk'],
        'sk': sha256(body['password'].encode('utf-8')).hexdigest(),
        'untilTimestamp': body['untilTimestamp']
    }
    #save note
    table.put_item(Item=note)
    #respond
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'success': True})
    }
