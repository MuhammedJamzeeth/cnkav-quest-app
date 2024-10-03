import logging

from fastapi import HTTPException
from pydantic import AnyUrl
from bson import ObjectId
from app.db.database import products_request
from starlette import status

from app.schema.product_request_schema import CreateProductRequest

logger = logging.getLogger(__name__)


def convert_to_str(value):
    """
       Converts the value to a string if it is of type AnyUrl.

       Args:
           value: The value to convert.

       Returns:
           str: The converted string value.
    """
    if isinstance(value, AnyUrl):
        return str(value)
    return value


async def creat_request(request: CreateProductRequest):
    """
       Creates a new product request in the database with the provided data.

       Args:
           request (CreateProductRequest): The data for the new product request.

       Returns:
           dict: The inserted product request.

       Raises:
           HTTPException: If there is an error inserting the data.
    """
    try:
        request_dict = request.dict(by_alias=True)
        # Convert any URL fields to strings
        request_dict = {k: convert_to_str(v) for k, v in request_dict.items()}
        result = await products_request.insert_one(request_dict)
        inserted_request = await products_request.find_one({"_id": result.inserted_id})
        return inserted_request
    except Exception as e:
        logger.error("Failed to create request: %s", e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to insert data")


async def find_by_id(request_id: str):
    """
       Retrieves a product request by its ID.

       Args:
           request_id (str): The ID of the product request to retrieve.

       Returns:
           dict: The product request data.

       Raises:
           HTTPException: If the request is not found or if there is an error fetching the data.
    """
    try:
        result = await products_request.find_one({"_id": ObjectId(request_id)})
        if result is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product request not found")
        return result
    except HTTPException as http_error:
        raise http_error
    except Exception as e:
        logger.error("Failed to retrieve request: %s", e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to get data")
