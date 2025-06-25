Cara menjalankan:

1. Buat environment Python 3.9+ dan aktifkan
2. Install dependencies:
   pip install -r requirements.txt

3. Jalankan training:
   python train_model.py

4. Jalankan server FastAPI:
   uvicorn predict:app --host 0.0.0.0 --port 8000

Cek di browser:
   http://localhost:8000/docs
