import json
import time
from hashlib import sha256

import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('notes')

def lambda_handler(event, context):
    #load params
    body = json.loads(event['body']) 
    key = {
        'pk': body['pk'],
        'sk': body['sk']
    }
    #update timestamp
    response = table.update_item(
        Key=key,
        UpdateExpression="set untilTimestamp = :r",
        ExpressionAttributeValues={
            ':r': int(body['untilTimestamp']),
        },
        ReturnValues="UPDATED_NEW"
    )
    #respond
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'success': True})
    }