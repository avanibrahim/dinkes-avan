from fastapi import APIRouter
from pydantic import BaseModel
from fastapi.responses import JSONResponse
import joblib
import os
import traceback

router = APIRouter()

# Load model
model_path = os.path.join(os.path.dirname(__file__), "../models/hiv_model.pkl")
model = joblib.load(model_path)

# Input schema
class HIVInput(BaseModel):
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

@router.post("/hiv")
def predict_hiv(data: HIVInput):
    try:
        features = [[
            data.q1, data.q2, data.q3, data.q4, data.q5,
            data.q6, data.q7, data.q8, data.q9, data.q10
        ]]
        prediction = model.predict(features)[0]
        positif = sum(features[0])
        negatif = len(features[0]) - positif

        if prediction == 1:
            hasil = "Positif"
            penjelasan = "Terdapat indikasi awal kemungkinan HIV berdasarkan gejala yang diinput."
            saran = "Segera lakukan pemeriksaan lanjutan di klinik atau rumah sakit untuk kepastian."
        else:
            hasil = "Negatif"
            penjelasan = "Tidak ada indikasi gejala HIV yang signifikan dari data yang diberikan."
            saran = "Tetap terapkan pola hidup sehat dan hindari perilaku berisiko."

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
