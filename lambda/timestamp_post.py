import json
import boto3
import time
from hashlib import sha256

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('notes')

def lambda_handler(event, context):
    body = json.loads(event['body']) 
    key = {
        'pk': body['pk'],
        'sk': body['sk']
    }
    response = table.update_item(
        Key=key,
        UpdateExpression="set untilTimestamp = :r",
        ExpressionAttributeValues={
            ':r': int(body['untilTimestamp']),
        },
        ReturnValues="UPDATED_NEW"
    )
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'success': True})
    }