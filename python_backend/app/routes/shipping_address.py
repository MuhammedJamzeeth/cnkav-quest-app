from fastapi import APIRouter, Query, status, HTTPException
from app.models.shipping_address import ShippingAddress
from app.service.shipping_address_service import (
    add_shipping_address, get_all_shipping_addresses_for_user, read_shipping_address, delete_shipping_address,
    update_shipping_address
)
from app.utils.jwt import user_dependency

router = APIRouter(
    prefix='/shipping-address',
    tags=['Shipping Address Management']
)


@router.post("", response_description="Add a new shipping address", status_code=status.HTTP_201_CREATED)
async def add_shipping_address_route(address_info: ShippingAddress,
                                     user: user_dependency):
    """
       Adds a new shipping address for the authenticated user.

       Args:
           address_info (ShippingAddress): The details of the shipping address to be added.
           user (user_dependency): Dependency providing user authentication details.

       Returns:
           JSONResponse: A response indicating the success of the operation with the status code 201 Created.

       Raises:
           HTTPException: If the user is not authenticated.
    """
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    return await add_shipping_address(user.get('email'), address_info)


@router.get("/{address_id}", response_description="Read an existing shipping address",
            status_code=status.HTTP_200_OK)
async def read_shipping_address_route(address_id: str, user: user_dependency):
    """
        Retrieves a shipping address by its ID for the authenticated user.

        Args:
            address_id (str): The ID of the shipping address to retrieve.
            user (user_dependency): Dependency providing user authentication details.

        Returns:
            dict: The shipping address details with the status code 200 OK.

        Raises:
            HTTPException: If the user is not authenticated or the address is not found.
    """
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    return await read_shipping_address(user.get('email'), address_id)


@router.get("", response_description="Get all shipping addresses for a user", status_code=status.HTTP_200_OK)
async def get_all_shipping_addresses_for_user_route(
        user: user_dependency,
        skip: int = Query(0, description="Number of records to skip"),
        limit: int = Query(10, description="Maximum number of records to return")):
    """
        Retrieves all shipping addresses for the authenticated user with optional pagination.

        Args:
            user (user_dependency): Dependency providing user authentication details.
            skip (int, optional): Number of records to skip (default is 0).
            limit (int, optional): Maximum number of records to return (default is 10).

        Returns:
            List[dict]: A list of shipping addresses with the status code 200 OK.

        Raises:
            HTTPException: If the user is not authenticated.
    """
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    return await get_all_shipping_addresses_for_user(user.get('email'), skip, limit)


@router.delete("/{address_id}", response_description="Delete a shipping address", status_code=status.HTTP_200_OK)
async def delete_shipping_address_route(address_id: str, user: user_dependency):
    """
        Deletes a shipping address by its ID for the authenticated user.

        Args:
            address_id (str): The ID of the shipping address to delete.
            user (user_dependency): Dependency providing user authentication details.

        Returns:
            JSONResponse: A response indicating the success of the operation with the status code 200 OK.

        Raises:
            HTTPException: If the user is not authenticated or the address is not found.
    """
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    return await delete_shipping_address(user.get('email'), address_id)


@router.put("/{address_id}", response_description="Update a shipping address", status_code=status.HTTP_200_OK)
async def update_shipping_address_route(address_id: str, address_info: ShippingAddress,
                                        user: user_dependency):
    """
        Updates a shipping address by its ID for the authenticated user.

        Args:
            address_id (str): The ID of the shipping address to update.
            address_info (ShippingAddress): The updated details of the shipping address.
            user (user_dependency): Dependency providing user authentication details.

        Returns:
            JSONResponse: A response indicating the success of the operation with the status code 200 OK.

        Raises:
            HTTPException: If the user is not authenticated or the address is not found.
    """
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    return await update_shipping_address(user.get('email'), address_id, address_info)
