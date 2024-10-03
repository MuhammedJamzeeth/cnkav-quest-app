from bson import ObjectId
from fastapi import HTTPException
import logging

from starlette import status
from starlette.responses import JSONResponse

from app.db.database import shipping_address_collection
from app.models.shipping_address import ShippingAddress

logger = logging.getLogger(__name__)


async def add_shipping_address(current_user_email: str, address_info: ShippingAddress):
    """
        Adds a new shipping address for the authenticated user.

        Args:
            current_user_email (str): The email of the authenticated user.
            address_info (ShippingAddress): The shipping address details to be added.

        Returns:
            JSONResponse: A response indicating the success of the operation with the status code 201 Created.

        Raises:
            HTTPException: If the address cannot be added or an internal server error occurs.
    """
    try:
        address_data = address_info.dict()
        address_data["created_by"] = current_user_email

        result = await shipping_address_collection.insert_one(address_data)
        if result.inserted_id:
            return JSONResponse(
                content={"message": "Shipping address added successfully", "address_id": str(result.inserted_id)},
                status_code=status.HTTP_201_CREATED)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Shipping address not added"
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Error adding shipping address: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error while adding shipping address"
        )


async def read_shipping_address(current_user_email: str, address_id: str):
    """
       Retrieves a shipping address by its ID for the authenticated user.

       Args:
           current_user_email (str): The email of the authenticated user.
           address_id (str): The ID of the shipping address to retrieve.

       Returns:
           dict: The shipping address details with the status code 200 OK.

       Raises:
           HTTPException: If the address is not found or an internal server error occurs.
    """
    try:
        address = await shipping_address_collection.find_one(
            {"_id": ObjectId(address_id), "created_by": current_user_email})

        if address:
            address["_id"] = str(address["_id"])
            return address
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shipping address not found"
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Error reading shipping address: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error while reading shipping address"
        )


async def delete_shipping_address(current_user_email: str, address_id: str):
    """
        Deletes a shipping address by its ID for the authenticated user.

        Args:
            current_user_email (str): The email of the authenticated user.
            address_id (str): The ID of the shipping address to delete.

        Returns:
            JSONResponse: A response indicating the success of the operation with the status code 200 OK.

        Raises:
            HTTPException: If the address is not found or an internal server error occurs.
    """
    try:
        result = await shipping_address_collection.delete_one(
            {"_id": ObjectId(address_id), "created_by": current_user_email}
        )
        if result.deleted_count == 1:
            return JSONResponse(content={"message": "Shipping address deleted successfully", "address_id": address_id},
                                status_code=status.HTTP_200_OK)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shipping address not found"
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Error deleting shipping address: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error while deleting shipping address")


async def update_shipping_address(current_user_email: str, address_id: str, address_info: ShippingAddress):
    """
       Updates a shipping address by its ID for the authenticated user.

       Args:
           current_user_email (str): The email of the authenticated user.
           address_id (str): The ID of the shipping address to update.
           address_info (ShippingAddress): The updated shipping address details.

       Returns:
           JSONResponse: A response indicating the success of the operation with the status code 200 OK.

       Raises:
           HTTPException: If the address is not found or an internal server error occurs.
    """
    try:
        update_data = {k: v for k, v in address_info.dict().items() if v is not None}
        result = await shipping_address_collection.update_one(
            {"_id": ObjectId(address_id), "created_by": current_user_email},
            {"$set": update_data}
        )
        if result.modified_count == 1:
            return JSONResponse(content={"msg": "Shipping address updated successfully", "address_id": address_id},
                                status_code=status.HTTP_200_OK)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shipping address not found"
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Error updating shipping address: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error while updating shipping address"
        )


async def get_all_shipping_addresses_for_user(current_user_email: str, skip: int = 0, limit: int = 10):
    """
       Retrieves all shipping addresses for the authenticated user with optional pagination.

       Args:
           current_user_email (str): The email of the authenticated user.
           skip (int, optional): Number of records to skip (default is 0).
           limit (int, optional): Maximum number of records to return (default is 10).

       Returns:
           List[dict]: A list of shipping addresses with the status code 200 OK.

       Raises:
           HTTPException: If an internal server error occurs while fetching the addresses.
    """
    try:
        addresses = await shipping_address_collection.find({"created_by": current_user_email}).skip(skip).limit(
            limit).to_list(length=None)
        for address in addresses:
            address["_id"] = str(address["_id"])  # Convert ObjectId to string
        return addresses
    except Exception as e:
        logger.error(f"Error fetching shipping addresses: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error while fetching shipping addresses"
        )
