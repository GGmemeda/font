/**
 * Created by caleb on 2015/10/9.
 */

var mainobj=document.getElementById("main"); //��ȡ��Ϸ�����div
var myplane; //�����ɻ�����
var leftbtn=false; //�ж��Ƿ����Ʒ����
var rightbtn=false; //�ж��Ƿ����Ʒ����
var topbtn=false; //�ж��Ƿ����Ʒ����
var buttombtn=false; //�ж��Ƿ����Ʒ����
var shutbtn = false; //�ж��Ƿ��������ӵ�������д��ĸA��
var bulletlist=new Array(); //�洢�ӵ��������б�

/**==========================================**/
var smellplanelist = new Array(); //�洢����С�ɻ��������б�
var killnum = 0; //����о�����
var score = 0; //�ּܷ������, ɱ��һ��С�ɻ��÷�Ϊ: score = 1��С�ɻ� * 5;
/**==========================================**/
var ctrlplanestop; //ֹͣ�ɻ��ƶ��ļ�����
var bulletflystop; //ֹͣ�ӵ����еļ�����
var bulletspeedstop; //ֹͣ�ӵ�����ļ�����
var mysmellplanestop; //ֹͣ����С�ɻ������ļ�����
var smellmovestop; //ֹͣ����С�ɻ��ƶ��ļ�����
var smellplanedeathstop; //ֹͣ����С�ɻ������к�ļ�����

/**
 * ����ɻ�����
 * @param imgsrc �ɻ�ͼƬ
 * @param x ��ʼ���ɻ���x����
 * @param y ��ʼ���ɻ���y����
 * @param blood �ɻ�����ֵ
 * @param speed �ɻ��ٶ�
 */
function createPlayerPlane(imgsrc, x, y, blood, speed) {
    this.planeNode = document.createElement("img");
    this.imageSrc = imgsrc;
    this.blood = blood;
    this.x = x;
    this.y = y;
    this.movespeed = speed;
    this.level = 1; //�ɻ��ȼ�
    this.boom = 10; //�ɻ�ը������
    this.leftmove = function() { //���÷ɻ����ƶ�
        if (this.planeNode.style.left == "-80px") { //����ɻ�ͼƬ�����ƶ��պ��뿪��Ϸ����
            this.planeNode.style.left = "440px"; //��ɻ�ͼƬ����Ϸ�����ұ߽���
        } else {
            this.planeNode.style.left = parseInt(this.planeNode.style.left) - this.movespeed + "px";
        }
    };
    this.rightmove = function() { //���÷ɻ����ƶ�
        if (this.planeNode.style.left == "440px") {
            this.planeNode.style.left = "-80px";
        } else {
            this.planeNode.style.left = parseInt(this.planeNode.style.left) + this.movespeed + "px";
        }
    };
    this.topmove=function(){ //���÷ɻ����ƶ�
        if(this.planeNode.style.top=="0px"){ //�����ƶ����ܳ�����Ϸ�Ϸ�����
            this.planeNode.style.top=="0px";
        }else{
            this.planeNode.style.top=parseInt(this.planeNode.style.top)-this.movespeed+"px";
        }
    };
    this.buttommove=function(){ //���÷ɻ����ƶ�
        if(this.planeNode.style.top=="600px"){ //�����ƶ����ܳ�����Ϸ�·�����
            this.planeNode.style.top=="600px"
        }else{
            this.planeNode.style.top=parseInt(this.planeNode.style.top)+this.movespeed+"px";
        }
    };
    this.shot = function() { //�����ӵ������״̬(�ϵ���)
        if (this.level == 1) {
            var bullet1 = new createbullet("plane1/EnemyFire_01.png",parseInt(this.planeNode.style.left)+35,parseInt(this.planeNode.style.top)+8,2);
            bulletlist.push(bullet1);
            var bullet2 = new createbullet("plane1/EnemyFire_01.png",parseInt(this.planeNode.style.left)-5,parseInt(this.planeNode.style.top)+8,2);
            bulletlist.push(bullet2);
        }
    };
    this.create = function() { //��ʼ���ɻ����CSS��ʽֵ
        this.planeNode.src = this.imageSrc;
        this.planeNode.style.position = "absolute";
        this.planeNode.style.left = this.x + "px";
        this.planeNode.style.top = this.y + "px";
        this.planeNode.style.zIndex="6";
        mainobj.appendChild(this.planeNode); //����Ϸ�������Ԫ�أ��ɻ�ͼƬ��
    };
    this.create();
}

/**
 * �����ӵ�����
 * @param bulletsrc
 * @param x
 * @param y
 * @param speed
 */
function createbullet(bulletsrc, x, y, speed) {
    this.bulletsrc = bulletsrc;
    this.x = x;
    this.y = y;
    this.bulletnode = document.createElement("img");
    this.btstate = true; //�ӵ�״̬
    this.speed = speed;
    this.move = function() { //�����ӵ��ƶ�
        this.bulletnode.style.top = parseInt(this.bulletnode.style.top) - this.speed + "px";
    };
    this.create = function() {
        this.bulletnode.src=this.bulletsrc;
        this.bulletnode.style.position="absolute";
        this.bulletnode.style.left=this.x+"px";
        this.bulletnode.style.top=this.y+"px";
        mainobj.appendChild(this.bulletnode);
    };
    this.create();
}

/**
 * ����С�ɻ�
 * @param smellplanesrc
 * @param x
 * @param y
 * @param speed
 */
function createsmellplane(smellplanesrc, x, y, speed) {
    this.smellplaneNode = document.createElement("img");
    this.smellplanesrc = smellplanesrc;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.isdead = false;
    this.deadtime = 10;
    this.move = function() {
        this.smellplaneNode.style.top = parseInt(this.smellplaneNode.style.top) + this.speed + "px";
    };
    this.create = function() {
        this.smellplaneNode.src = this.smellplanesrc;
        this.smellplaneNode.style.position = "absolute";
        this.smellplaneNode.style.left = this.x + "px";
        this.smellplaneNode.style.top = this.y + "px";
        mainobj.appendChild(this.smellplaneNode);
    };
    this.create();
}