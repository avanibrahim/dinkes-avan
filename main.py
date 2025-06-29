from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.predict_stunting import router as stunting_router
from api.predict_dbd import router as dbd_router
from api.predict_hiv import router as hiv_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include semua router
app.include_router(stunting_router, prefix="/predict", tags=["Stunting"])
app.include_router(dbd_router, prefix="/predict", tags=["DBD"])
app.include_router(hiv_router, prefix="/predict", tags=["HIV"])

