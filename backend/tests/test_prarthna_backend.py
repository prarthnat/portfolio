"""Backend API tests for PrarthnaOS - /api/, /api/contact, /api/guestbook."""
import os
import pytest
import requests
import uuid

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://pixel-arjun-studio.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# /api/ root
class TestRoot:
    def test_root_returns_online_message(self, session):
        r = session.get(f"{API}/", timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "message" in data
        assert "PrarthnaOS backend online" in data["message"]


# /api/contact
class TestContact:
    def test_contact_valid_creates(self, session):
        payload = {
            "name": "TEST_User",
            "email": f"test_{uuid.uuid4().hex[:6]}@example.com",
            "message": "Hello from pytest",
        }
        r = session.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["message"] == payload["message"]
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert "timestamp" in data

    def test_contact_invalid_email_422(self, session):
        r = session.post(
            f"{API}/contact",
            json={"name": "X", "email": "not-an-email", "message": "hi"},
            timeout=15,
        )
        assert r.status_code == 422, r.text

    def test_contact_missing_fields_422(self, session):
        r = session.post(f"{API}/contact", json={"name": "X"}, timeout=15)
        assert r.status_code == 422, r.text


# /api/guestbook
class TestGuestbook:
    def test_post_and_get_guestbook(self, session):
        nickname = f"TEST_{uuid.uuid4().hex[:6]}"
        note = "pytest was here"
        post = session.post(
            f"{API}/guestbook",
            json={"nickname": nickname, "note": note},
            timeout=15,
        )
        assert post.status_code == 200, post.text
        created = post.json()
        assert created["nickname"] == nickname
        assert created["note"] == note
        assert "id" in created
        assert "timestamp" in created

        get = session.get(f"{API}/guestbook", timeout=15)
        assert get.status_code == 200, get.text
        entries = get.json()
        assert isinstance(entries, list)
        found = next((e for e in entries if e.get("nickname") == nickname), None)
        assert found is not None, "Inserted guestbook entry not found in list"
        assert found["note"] == note

    def test_guestbook_invalid_missing_fields(self, session):
        r = session.post(f"{API}/guestbook", json={"nickname": "X"}, timeout=15)
        assert r.status_code == 422, r.text
