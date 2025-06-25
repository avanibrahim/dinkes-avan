from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import joblib
import os
import traceback

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model lazy load
model = None

def get_model():
    global model
    if model is None:
        print("📦 Loading model...")
        model_path = os.path.join(os.path.dirname(__file__), 'diagnosis_model.pkl')
        model = joblib.load(model_path)
        print("✅ Model loaded.")
    return model

# Input Schema
class Input(BaseModel):
    q1: int
    q2: int
    q3: int
    q4: int
    q5: int
    q6: int
    q7: int
    q8: int
    q9: int
    q10: int
    q11: int
    q12: int

# Endpoint prediksi
@app.post("/predict")
def predict(input: Input):
    try:
        model = get_model()
        features = [[
                input.q1, input.q2, input.q3, input.q4,
                input.q5, input.q6, input.q7, input.q8,
                input.q9, input.q10, input.q11, input.q12
            ]]
        print("📨 Received input:", features)
        prediction = model.predict(features)[0]
        return {"prediction": str(prediction)}  # ← pastikan JSON-friendly
    except Exception as e:
        tb = traceback.format_exc()
        print("❌ Error:", tb)
        return JSONResponse(status_code=500, content={"error": str(e), "trace": tb})