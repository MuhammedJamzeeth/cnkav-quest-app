# routes/affiliate_routes.py
import logging
from app.schema.product_request_schema import CreateProductRequest
from fastapi import APIRouter
from app.service.affiliate_link_service import create_affiliate_link , edit_affiliate_link , delete_affiliate_link , get_all
from app.service.affiliate_click_service import track_click
from app.service.affiliate_sale_service import track_sale
from app.schema.affiliate_schema import AffiliateLinkRequest , clicksSchema , salesSchema
router = APIRouter(prefix='/affiliate')

logger = logging.getLogger(__name__)
# Affiliate Link
@router.post("/generate-link")
async def generate_affiliate_link(affiliate:AffiliateLinkRequest):
    result = await create_affiliate_link(affiliate)
    return result


@router.put("/edit-link")
async def edit_affiliate_link(affiliate_id: str, affiliate:AffiliateLinkRequest):
    result = await edit_affiliate_link(affiliate_id,affiliate)
    return result


@router.delete("/delete-link/{affiliate_id}")
async def delete_affiliate_link(affiliate_id: str):
    result = await delete_affiliate_link(affiliate_id)
    return result


@router.post("/track_click")
async def track_affiliate_click(click: clicksSchema):
    
    result = await track_click(click)
    return result

@router.post("/track_sale")
async def track_affiliate_sale(sale:salesSchema):
    result = await track_sale(sale)
    return result

@router.get("/all-products")
async def get_requested_products():
    result = await get_all()
    return result