"""Generate the narration track and per-line timings from script.json.

Usage: python tts.py <kokoro.onnx> <voices.bin>
Writes build/narration.wav and build/timings.json.
"""
import json
import os
import sys

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

HERE = os.path.dirname(os.path.abspath(__file__))
SR = 24000
LINE_GAP = 0.45   # silence after each line (s)
SCENE_GAP = 0.9   # extra silence between scenes (s)
LEAD_IN = 1.0     # silence before the first line (s)


def silence(sec):
    return np.zeros(int(sec * SR), dtype=np.float32)


def main():
    kokoro = Kokoro(sys.argv[1], sys.argv[2])
    with open(os.path.join(HERE, "script.json"), encoding="utf-8") as f:
        script = json.load(f)
    voice, lang, speed = script["voice"], script["lang"], script["speed"]

    chunks = [silence(LEAD_IN)]
    t = LEAD_IN
    timings = {"scenes": []}
    for scene in script["scenes"]:
        s_entry = {"id": scene["id"], "start": t, "lines": []}
        for line in scene["lines"]:
            parts = line.get("parts") or [{"t": line["t"]}]
            start = t
            for i, part in enumerate(parts):
                samples, sr = kokoro.create(
                    part["t"],
                    voice=part.get("voice", voice),
                    speed=part.get("speed", speed),
                    lang=part.get("lang", lang),
                )
                assert sr == SR
                samples = samples.astype(np.float32)
                chunks.append(samples)
                t += len(samples) / SR
                if i < len(parts) - 1:
                    chunks.append(silence(0.15))
                    t += 0.15
            s_entry["lines"].append({
                "start": round(start, 3),
                "end": round(t, 3),
                "cap": line.get("cap") or line.get("t") or " ".join(p["t"] for p in parts),
            })
            chunks.append(silence(LINE_GAP))
            t += LINE_GAP
        tail = scene.get("tail", SCENE_GAP)
        chunks.append(silence(tail))
        t += tail
        s_entry["end"] = round(t, 3)
        timings["scenes"].append(s_entry)
        print(f"{scene['id']:<12} {s_entry['start']:7.2f} -> {s_entry['end']:7.2f}")

    timings["duration"] = round(t, 3)
    audio = np.concatenate(chunks)
    audio = audio / max(1e-6, np.abs(audio).max()) * 0.89
    os.makedirs(os.path.join(HERE, "build"), exist_ok=True)
    sf.write(os.path.join(HERE, "build", "narration.wav"), audio, SR)
    with open(os.path.join(HERE, "build", "timings.json"), "w", encoding="utf-8") as f:
        json.dump(timings, f, ensure_ascii=False, indent=1)
    print(f"total {t:.1f}s")


if __name__ == "__main__":
    main()
