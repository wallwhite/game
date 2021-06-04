import { Vec2 as Vector2, Vec3 as Vector3 } from '@jingwood/graphics-math';

const clamp = (v, min = 0, max = 1) => {
    if (!Number.isNaN(v)) {
        if (v < min) return min;
        if (v > max) return max;
        return v;
    }
    if (v instanceof Vector2) {
        return new Vector2(clamp(v.x, min, max), clamp(v.y, min, max));
    }
    if (v instanceof Vector3) {
        return new Vector3(clamp(v.x, min, max), clamp(v.y, min, max), clamp(v.z, min, max));
    }

    return v;
};

const vector2MultiplyScalar = (v, scalar) => {
    return new Vector2(v.x * scalar, v.y * scalar);
};

const findLineIntersectCirclePoint = (origin, radius, endPoint) => {
    let v = endPoint.sub(origin);

    const lineLength = v.length();

    if (lineLength === 0) return endPoint;

    v = v.normalize();

    return origin.add(vector2MultiplyScalar(v, radius));
};

const findPointIntersectCircle = (origin, radius, endPoint) => {
    return (endPoint.x - origin.x) ** 2 + (endPoint.y - origin.y) ** 2 <= radius ** 2;
};

const degreeToAngle = d => {
    return (d * 180.0) / Math.PI;
};

export { degreeToAngle, clamp, vector2MultiplyScalar, findLineIntersectCirclePoint, findPointIntersectCircle };
