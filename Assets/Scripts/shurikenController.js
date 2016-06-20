/**
* Сюрикен
*
* Класс описывает поведение сюрикена.
*
* @author	   Kirill Romanov
* @version	  1.0
* @copyright	GNU Public License
* @todo		 Реализовать поворот при столкновении с препятствием
*/

#pragma strict

/**
* Скорость вращения
*
* Задает скорость вращения
*
* @var int rotateSpeed
*/
public var rotateSpeed : int;
/**
* Скорость полета
*
* Задает скорость полета
*
* @var float flySpeed
*/
public var flySpeed : float;
/**
* Время жизни
*
* Задает время жизни, после которого сюрикен исчезнет
*
* @var float lifeTime
*/
public var lifeTime : float;


/**
* Физическое тело
*
* Ссылка на физическое тело объекта
*
* @var Rigidbody2D rigidBody
*/
private var rigidBody : Rigidbody2D;
/**
* Счетчик времени
*
* Текущее время существования объекта
*
* @var Rigidbody2D rigidBody
*/
private var time : float = 0.0;


/**
* Инициализация объекта
*
* Устанавливает значение свойству {@link rigidBody}
*
* @return	void
*/
function Start()
{
	rigidBody = GetComponent(Rigidbody2D);
}


/**
* Обновление объекта
*
* Поворачивает объект в зависимости от {@link rotateSpeed}, устанавливает
* горизонтальную скорость, равную {@link flySpeed} и увеличивает {@link time}.
* Если {@link time} превышает {@link lifeTime}, уничтожает объект.
*
* @return	void
*/
function Update()
{
	transform.Rotate(Vector3(0f, 0f, rotateSpeed * Time.deltaTime));
	rigidBody.velocity.x = flySpeed;

	time += Time.deltaTime;
	if (time >= lifeTime)
	{
		Destroy(gameObject);
	}
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
* Если триггер, с которым произошло столкновение, убиваемый противник, вызывает
* у него метод Die(), затем уничтожается.
*
* @param Collider2D  collider Коллайдер
* @return	void
*/
function OnTriggerEnter2D(collider : Collider2D)
{
	var enemyScript = collider.gameObject.GetComponent.<enemyScript>();
	enemyScript.Die();
	Destroy(gameObject);
}


/**
* Выход из триггера
*
* Если триггер, из которого вышел объект, это Персонаж, то отключает режим
* триггера у объекта.
*
* @param Collider2D  collider Коллайдер
* @return	void
*/
function OnTriggerExit2D(collider : Collider2D)
{
	if (collider.gameObject.tag == "Player")
	{
		GetComponent(CircleCollider2D).isTrigger = false;
	}
}
