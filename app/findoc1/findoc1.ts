export class Findoc1 {

    // Financiamento tipo empréstimo pré-fixado

    public id: number;
    public cod: string;
    public std: string;
    public stdList: string[];
    public dt: string;
    public val: string;
    public valiof: string;
    public valseg: string;
    public n: number;
    public pmt: string;
    public dt1: string;

    constructor() {
        this.id = 0;
        this.cod = '';
        this.std = 'Emp.pré fixado';
        this.stdList = ['Emp.pré fixado'];
        this.dt = '';
        this.val = '0,00';
        this.valiof = '0,00';
        this.valseg = '0,00';
        this.n = 1;
        this.pmt = '0,00';
        this.dt1 = '';
    }

}