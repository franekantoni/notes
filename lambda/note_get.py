import json
import boto3
import time
from hashlib import sha256
from decimal import Decimal

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return int(obj)
        return super(DecimalEncoder, self).default(obj)

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('notes')

def lambda_handler(event, context):
    queryStringParameters =  event.get('queryStringParameters') or {}
    key = {
        'pk': queryStringParameters['pk'],
        'sk': queryStringParameters['sk']
    }
    note = table.get_item(Key=key).get('Item')
    if note:
        if float(note['untilTimestamp'])-time.time()*1000 < 0:
            note = None
            table.delete_item(Key=key)
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'note': note}, cls=DecimalEncoder)
    }