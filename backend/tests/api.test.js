import test from 'node:test'; import assert from 'node:assert/strict'; import request from 'supertest'; import app from '../src/app.js';
test('health endpoint',async()=>{const res=await request(app).get('/api/v1/health'); assert.equal(res.status,200); assert.equal(res.body.success,true);});
test('protected route rejects missing token',async()=>{const res=await request(app).get('/api/v1/auth/me'); assert.equal(res.status,401);});
