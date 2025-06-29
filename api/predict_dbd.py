# api/predict_dbd.py

from fastapi import APIRouter
from pydantic import BaseModel
from fastapi.responses import JSONResponse
import joblib
import os
import traceback

router = APIRouter()

# Load model
model_path = os.path.join(os.path.dirname(__file__), '../models/dbd_model.pkl')  # Pastikan file ini ada
model = joblib.load(model_path)

# Schema input: 6 pertanyaan
class DBDInput(BaseModel):
    q1: int
    q2: int
    q3: int
    q4: int
    q5: int
    q6: int

@router.post("/dbd")
def predict_dbd(data: DBDInput):
    try:
        features = [[
            data.q1, data.q2, data.q3, data.q4, data.q5, data.q6
        ]]
        prediction = model.predict(features)[0]
        positif = sum(features[0])
        negatif = len(features[0]) - positif

        if prediction == 1:
            hasil = "Positif"
            penjelasan = "Model mendeteksi adanya kemungkinan infeksi DBD berdasarkan gejala."
            saran = "Segera periksakan diri ke fasilitas kesehatan terdekat."
        else:
            hasil = "Negatif"
            penjelasan = "Tidak ada indikasi signifikan ke arah DBD dari jawaban Anda."
            saran = "Tetap waspada dan pantau kondisi tubuh secara berkala."

        return {
            "prediction": hasil,
            "penjelasan": penjelasan,
            "saran": saran,
            "chart_data": {
                "positif": positif,
                "negatif": negatif
            }
        }

    except Exception as e:
        tb = traceback.format_exc()
        return JSONResponse(status_code=500, content={
            "error": str(e),
            "trace": tb
        })
