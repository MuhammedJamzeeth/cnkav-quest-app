from fastapi import APIRouter, HTTPException, Depends
from starlette import status
from app.models.product_request import ProductRequest
from app.schema.product_request_schema import CreateProductRequest
from app.service.product_request_service import creat_request, find_by_id
from app.utils.jwt import user_dependency

router = APIRouter(
    prefix='/product_request',
    tags=['Product request management']
)


@router.post("/create",
             status_code=status.HTTP_201_CREATED,
             response_model=ProductRequest,
             response_description="Request Created Successfully"
             )
async def create_product_request(product: CreateProductRequest):
    """
      Creates a new product request.

      Args:
          product (CreateProductRequest): The data required to create a new product request.

      Returns:
          ProductRequest: The created product request with the status code 201 Created.
    """
    result = await creat_request(product)
    return result


@router.get("/{request_id}", response_model=CreateProductRequest)
async def get_request_by_id(request_id: str, user: user_dependency):
    """
        Retrieves a product request by its ID for an authenticated user.

        Args:
            request_id (str): The ID of the product request to retrieve.
            user (user_dependency): The authenticated user making the request.

        Returns:
            CreateProductRequest: The product request with the specified ID.
    """
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    result = await find_by_id(request_id)
    return result
