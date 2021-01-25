class CellInfo {
    public x: number;
    public y: number;
    public isActive: boolean;

    public constructor(x?: number, y?: number, isActive?: boolean) {
        this.x = x || 0;
        this.y = y || 0;
        this.isActive = isActive || false;
    }
}

export default CellInfo;