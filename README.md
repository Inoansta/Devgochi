# devgochi

> 데브고치는 미니게임 플레이를 통해 경험치를 획득하고,
> 이를 기반으로 메인 캐릭터(데브고치)가 성장하는 시스템의 게임입니다.

플레이어는 서로 다른 기술 스택을 활용한 3가지 미니게임을 플레이하게 되며,
게임의 종류에는 Running Man, Rhythm Code, Bug Hunter
화면 하단의 버튼을 클릭하여 자유롭게 선택 및 플레이할 수 있습니다.

## Tech Stack

- React 19
- Vite + TypeScript
- React Router (v7)
- styled-components (v6)
- Framer Motion

## Deployed

- Demo: https://devgochi.vercel.app/

---

## Features

### - 미니게임 1

- 게임 컨셉 :  달려오는 버그를 피하는 무한 러닝 게임

- 조작 방법 : 키보드(Space Bar) 또는 마우스 클릭을 사용하여 다가오는 장애물 타이밍에 맞춰 점프  

- 목표 : 장애물을 피하며 최대한 오래 생존하여 최고 점수 갱신

- 획득 보상 : 얻은 점수에 비례하여 경험치 획득

### - 미니게임 2

- 게임 컨셉 : 타이밍에 맞게 코드를 입력 

- 조작 방법 : 키보드 (D,F,J,K)키를  사용하여 위에서 아래로 내려오는 노트를 히트라인에 타이밍을 맞춰서 입력  

- 목표 : 정확한 판정을 통해 높은 점수 획득

- 획득 보상 : 얻은 점수에 비례하여 경험치 획득

### - 미니게임 3

- 게임 컨셉 : 코드와 버그를 분류하는 게임

- 조작 방법 : 키보드 방향키(←, →)를 이용해 분류

- 목표 : 올바르게 분류하여 높은 점수 획득

- 획득 보상 : 얻은 점수에 비례하여 경험치 지급

---

## Getting Started

### Requirements

- Node.js (권장: 18+ 또는 20+)
- npm

### Install

```bash
npm install
```

### Run

```bash
npm run dev
```

### Build

```bash
npm run build
```

### ESLint

```bash
npm run lint
```
