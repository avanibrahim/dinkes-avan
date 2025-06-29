from fastapi import APIRouter
from pydantic import BaseModel
from fastapi.responses import JSONResponse
import joblib
import os
import traceback

router = APIRouter()

# Load model saat startup
model_path = os.path.join(os.path.dirname(__file__), '../models/stunting_model.pkl')
model = joblib.load(model_path)

# Schema input
class StuntingInput(BaseModel):
    q1: int
    q2: int
    q3: int
    q4: int
    q5: int
    q6: int
    q7: int
    q8: int

@router.post("/stunting")
def predict_stunting(data: StuntingInput):
    try:
        features = [[
            data.q1, data.q2, data.q3, data.q4,
            data.q5, data.q6, data.q7, data.q8
        ]]

        prediction = model.predict(features)[0]
        positif_count = sum(features[0])
        negatif_count = len(features[0]) - positif_count

        # Mapping hasil ke penjelasan dan saran
        if prediction == 1:
            hasil = "Positif"
            penjelasan = "Pasien menunjukkan indikasi stunting berdasarkan gejala yang terdeteksi."
            saran = "Segera konsultasikan dengan ahli gizi atau dokter anak untuk pemantauan lebih lanjut."
        else:
            hasil = "Negatif"
            penjelasan = "Pasien tidak menunjukkan indikasi stunting yang signifikan."
            saran = "Tetap jaga pola makan dan lakukan kontrol pertumbuhan secara rutin."

        return {
            "prediction": hasil,
            "penjelasan": penjelasan,
            "saran": saran,
            "chart_data": {
                "positif": positif_count,
                "negatif": negatif_count
            }
        }

    except Exception as e:
        tb = traceback.format_exc()
        return JSONResponse(status_code=500, content={
            "error": str(e),
            "trace": tb
        })
