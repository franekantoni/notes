import json
import time
from decimal import Decimal
from hashlib import sha256

import boto3

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return int(obj)
        return super(DecimalEncoder, self).default(obj)

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('notes')

def lambda_handler(event, context):
    #get parameters
    queryStringParameters =  event.get('queryStringParameters') or {}
    key = {
        'pk': queryStringParameters['pk'],
        'sk': queryStringParameters['sk']
    }
    #get note
    note = table.get_item(Key=key).get('Item')
    #if note exists, check if it should be available
    if note:
        if float(note['untilTimestamp'])-time.time()*1000 < 0:
            note = None
            table.delete_item(Key=key)
    #respond
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'note': note}, cls=DecimalEncoder)
    }