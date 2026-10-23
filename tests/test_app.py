import unittest

from app import app


class PasswordCheckerAppTests(unittest.TestCase):
    def setUp(self):
        app.config.update(TESTING=True)
        self.client = app.test_client()

    def test_homepage_contains_password_checker(self):
        response = self.client.get("/")

        self.assertEqual(response.status_code, 200)
        self.assertIn(b"<h1 id=\"page-title\">PASSWORD STRENGTH CHECKER</h1>", response.data)
        self.assertIn(b'type="password"', response.data)
        self.assertIn(b"Your password is never stored, logged, or sent anywhere.", response.data)

    def test_homepage_sets_privacy_headers(self):
        response = self.client.get("/")

        self.assertEqual(response.headers["Cache-Control"], "no-store")
        self.assertIn("connect-src 'none'", response.headers["Content-Security-Policy"])
        self.assertEqual(response.headers["X-Content-Type-Options"], "nosniff")
        self.assertEqual(response.headers["X-Frame-Options"], "DENY")

    def test_password_is_not_accepted_by_a_submission_endpoint(self):
        response = self.client.post("/api/scan", json={"password": "example"})

        self.assertEqual(response.status_code, 404)


if __name__ == "__main__":
    unittest.main()
