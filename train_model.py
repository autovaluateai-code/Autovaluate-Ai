# ==============================================================================
# AutoValuate India — Resale Price Prediction Capstone Model Trainer
# CLI Scikit-Learn Training & Evaluation Script
# Usage: python3 train_model.py
# ==============================================================================

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, KFold, cross_val_score
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error

print("==================================================================")
print("🚗 AutoValuate India — ML Capstone Model Training Engine")
print("==================================================================")

# 1. Load Data
try:
    df = pd.read_csv("indian_vehicle_resale_dataset_550.csv")
    print(f"Loaded dataset: {len(df)} rows across {len(df.columns)} features.")
except Exception as e:
    print(f"Dataset error: {e}")
    exit(1)

# 2. Features and Target
X = df[["brand", "model", "type", "age_years", "km_driven", "fuel", "transmission", "owner", "city", "ex_showroom_inr"]]
y = df["fair_resale_inr"]

categorical_cols = ["brand", "model", "type", "fuel", "transmission", "owner", "city"]
numerical_cols = ["age_years", "km_driven", "ex_showroom_inr"]

preprocessor = ColumnTransformer(
    transformers=[
        ("num", StandardScaler(), numerical_cols),
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_cols)
    ]
)

models = {
    "Random Forest": RandomForestRegressor(n_estimators=100, random_state=42),
    "Gradient Boosting": GradientBoostingRegressor(n_estimators=120, learning_rate=0.08, random_state=42),
    "Linear Regression": LinearRegression()
}

# 3. Train-Test Split (80/20)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42)
print(f"Train samples: {len(X_train)} | Test samples: {len(X_test)}")
print("------------------------------------------------------------------")

for name, model in models.items():
    pipe = Pipeline(steps=[("preprocessor", preprocessor), ("regressor", model)])
    pipe.fit(X_train, y_train)
    y_pred = pipe.predict(X_test)
    
    r2 = r2_score(y_test, y_pred)
    mae = mean_absolute_error(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    
    print(f"Model: {name}")
    print(f"  R2 Score : {r2:.4f}")
    print(f"  MAE      : Rs. {mae:,.0f}")
    print(f"  RMSE     : Rs. {rmse:,.0f}")
    print("------------------------------------------------------------------")

print("Training complete! Model ready for Streamlit deployment.")
