import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

# Contoh data dummy dengan 12 fitur
data = pd.DataFrame({
    "q1":  [1, 0, 1, 0],
    "q2":  [1, 0, 1, 0],
    "q3":  [0, 1, 0, 1],
    "q4":  [0, 1, 0, 1],
    "q5":  [0, 1, 1, 0],
    "q6":  [0, 1, 1, 0],
    "q7":  [0, 1, 0, 1],
    "q8":  [1, 0, 0, 1],
    "q9":  [0, 1, 1, 0],
    "q10": [0, 1, 0, 1],
    "q11": [1, 0, 1, 0],
    "q12": [1, 0, 1, 0],
    "label": ["stunting", "hiv", "dbd", "sehat"]
})

# Split data
X = data.drop("label", axis=1)
y = data["label"]

# Latih model
model = RandomForestClassifier()
model.fit(X, y)

# Simpan model
joblib.dump(model, "diagnosis_model.pkl")
print("✅ Model with 12 features saved as diagnosis_model.pkl")
