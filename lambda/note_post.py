import json
import boto3
import time
from hashlib import sha256

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('notes')

def lambda_handler(event, context):
    body = json.loads(event['body'])
    note = {
        'text': body['text'],
        'pk': body['pk'],
        'sk': sha256(body['password'].encode('utf-8')).hexdigest(),
        'untilTimestamp': body['untilTimestamp']
    }
    table.put_item(Item=note)
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'success': True})
    }
