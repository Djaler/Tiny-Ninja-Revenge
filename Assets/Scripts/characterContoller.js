/**
* Персонаж
*
* Класс управляет поведение персонажа.
*
* @author	   Kirill Romanov
* @version	  1.0
* @copyright	GNU Public License
*/

#pragma strict

/**
* Максимальная скорость
*
* Максимальная скорость движения персонажа.
*
* @var int maxSpeed
*/
public var maxSpeed : int;
/**
* Сила прыжка
*
* Сила прыжка персонажа
*
* @var int jump
*/
public var jump : int;
/**
* Радиус проверки земли
*
* Радиус, при попадении в который земли, считается, что персонаж стоит.
*
* @var float groundCheckRadius
*/
public var groundCheckRadius : float;
/**
* Что есть земля
*
* Слой, объекты которого интерпретируются как земля
*
* @var LayerMask whatIsGround
*/
public var whatIsGround : LayerMask;
/**
* Задержка смерти
*
* Задержка перед перезагрузкой уровня в случае смерти
*
* @var float dieDelay
*/
public var dieDelay : float;
public var shurikenQuantity : int = 5;


/**
* Сюрикен
*
* Указатель на префаб сюрикена, для возможности его создания
*
* @var Transform shuriken
*/
public var shuriken : Transform;

public var shurikenTexture : Texture2D;
public var scoreText: UnityEngine.UI.Text;

/**
* Объект проверки земли
*
* Объект, относительно которого идет проверка на наличие земли под ногами/
*
* @var Transform groundCheck
*/
public var groundCheck : Transform;


/**
* Направлен вправо
*
* Определяет, в какую сторону сейчас повернут персонаж
*
* @var boolean facingRight
*/
private var facingRight : boolean = true;
/**
* Скорость движения
*
* Определяет скорость и направление движения персонажа
*
* @var float move
*/
private var move : float;
/**
* Возможность прыжка
*
* Определяет, может ли персонаж прыгать в данный момент
*
* @var boolean canJump
*/
private var canJump = false;
/**
* Жив
*
* Определяет, жив ли сейчас персонаж
*
* @var boolean alive
*/
private var alive : boolean = true;
/**
* Аниматор
*
* Ссылка на аниматор объекта
*
* @var Animator animator
*/
private var animator : Animator;
/**
* Физическое тело
*
* Ссылка на физическое тело объекта
*
* @var Rigidbody2D rigidBody
*/
private var rigidBody : Rigidbody2D;


/**
* Инициализация объекта
*
* Устанавливает значение свойствам {@link animator} и {@link rigidBody}
*
* @return	void
*/
function Start()
{
	animator = GetComponent(Animator);
	rigidBody = GetComponent(Rigidbody2D);
	scoreText.text = "×" + shurikenQuantity;
}

/**
* Фиксированное обновление объекта
*
* Устанавливает {@link move} в зависимости от нажатий клавиш пользователем,
* устанавливает {@link canJump} в зависимости от положения персонажа
* относительно земли, устанавливает соответствующие анимации.
*
* @return	void
*/
function FixedUpdate()
{
	if (!alive)
	{
		return;
	}
	canJump = Physics2D.OverlapCircle(groundCheck.position, groundCheckRadius, whatIsGround);

	move = Input.GetAxis("Horizontal");

	animator.SetFloat("Speed", Mathf.Abs(move));

	animator.SetBool("Ground", canJump);
}

/**
* Обновление объекта
*
* В зависимости от нажатых клавиш управляет персонажем либо перезагружает уровень.
*
* @return	void
*/
function Update()
{
	if (Input.GetKey(KeyCode.R))
	{
		ReloadScene();
	}

	if (!alive)
	{
		return;
	}

	Movement();
	Shot();
}


/**
* Выстрел
*
* При нажатии левого шифта создает клон объекта {@link shuriken} и задает ему
* скорость и направление движения
*
* @return	void
*/
function Shot()
{
	if (Input.GetKeyDown(KeyCode.LeftShift) && shurikenQuantity > 0)
	{
		shurikenQuantity -= 1;
		animator.SetTrigger ("Attack");
		var cloneShuriken = Instantiate(shuriken);
		cloneShuriken.position = Vector3(transform.position.x + (facingRight ? 1 : -1) * 0.05, transform.position.y + 0.12, transform.position.z);
		cloneShuriken.GetComponent(shurikenController).flySpeed *= (facingRight ? 1 : -1);
		scoreText.text = "×" + shurikenQuantity;
	}
}


/**
* Движение
*
* При нажатии пробела и при положительном значении {@link canJump} задает у
* {@link rigidBody} вертикальную скорость, соответствующую {@link jump}.
* Задает горизонтальную скорость в зависимости от {@link move} и {@link maxSpeed}
*
* @return	void
*/
function Movement()
{
	var jumpPressed = Input.GetKeyDown(KeyCode.Space) || Input.GetKeyDown(KeyCode.UpArrow);
	if (canJump && jumpPressed)
	{
		canJump = false;
		rigidBody.velocity.y = jump;
	}

	rigidBody.velocity.x = move * maxSpeed * Time.deltaTime;
	if ((move > 0 && !facingRight) || (move < 0 && facingRight))
	{
		Flip();
	}
}


/**
* Поворот объекта
*
* Инвертирует значение свойства {@link facingRight}.
* Выполняет поворот у объекта {@link animator}.
*
* @return	void
*/
function Flip()
{
	facingRight = !facingRight;
	animator.transform.Rotate(0, 180, 0);
}


/**
* Вход в коллизию
*
* Вызывает метод {@link OnTriggerEnter2D}
*
* @param Collision2D  collision Коллизия
* @return	void
*/
function OnCollisionEnter2D(collision : Collision2D)
{
	OnTriggerEnter2D(collision.collider);
}


/**
* Вход в триггер
*
* Если этот триггер является противником, вызывает метод {@link Die}
*
* @param Collider2D  collider Коллайдер
* @return	void
*/
function OnTriggerEnter2D(collider : Collider2D)
{
	if (collider.gameObject.tag == "Enemy")
	{
		Die();
	}
	else if (collider.gameObject.tag == "ShurikenBonus") 
	{
		shurikenQuantity+=5;
		scoreText.text = "×" + shurikenQuantity;
		Destroy (collider.gameObject);
	}
}


/**
* Смерть
*
* Устанавливает отрицательное значение {@link alive}, устанавливает
* соответствующие анимации, перезагружает сцену после задержки в {@link dieDelay}
* секунд
*
* @return	void
*/
function Die()
{
	alive = false;
	animator.SetTrigger("Die");
	animator.SetBool("Ground", true);
	yield WaitForSeconds (dieDelay);
	ReloadScene();
}


/**
* Перезагрузка сцены
*
* Загружает заново текущую сцену
*
* @return	void
*/
function ReloadScene()
{
	SceneManagement.SceneManager.LoadScene(SceneManagement.SceneManager.GetActiveScene().buildIndex);
}
