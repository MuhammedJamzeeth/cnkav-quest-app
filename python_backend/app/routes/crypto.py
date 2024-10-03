from fastapi import APIRouter, FastAPI, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import requests
import os

load_dotenv()

COINBASE_COMMERCE_API_KEY = os.getenv("COINBASE_COMMERCE_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your needs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

router = APIRouter(
    prefix='/pay',
    tags=['Payment Management']
)

@router.post('/create-onramp-session')
async def create_onramp_session(
    name: str = Form(...),
    email: str = Form(...),
    price: float = Form(...),
    user_id: str = Form(...)
):
    try:
        headers = {
            "Content-Type": "application/json",
            "X-CC-Api-Key": COINBASE_COMMERCE_API_KEY,
            "X-CC-Version": "2018-03-22"
        }

        charge_data = {
            "name": name,
            "description": f"Payment for {name}",
            "local_price": {
                "amount": str(price),
                "currency": "USD"
            },
            "pricing_type": "fixed_price",
            "metadata": {
                "customer_id": user_id,
                "customer_email": email
            }
        }

        response = requests.post(
            "https://api.commerce.coinbase.com/charges",
            json=charge_data,
            headers=headers
        )

        if response.status_code == 201:
            charge = response.json()
            return {"hosted_url": charge['data']['hosted_url']}
        else:
            raise HTTPException(status_code=response.status_code, detail=response.json())

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Include the router in the FastAPI app
app.include_router(router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Payment Management API"}
