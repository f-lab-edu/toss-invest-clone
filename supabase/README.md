# Supabase Edge Functions (Quickstart)

## 로컬 실행
```
npm i

docker ps // Docker Desktop 실행 확인

supabase start

supabase functions serve hello-world
```

## 배포
```
supabase login

supabase projects list  // 프로젝트 ID 확인

supabase functions deploy hello-world  // 함수 배포
supabase functions deploy // 전체 배포
```